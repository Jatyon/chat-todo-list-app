import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Token } from '@core/models/token.model';
import { MainRest } from '@core/modules/rest/main.rest';
import { AuthRest } from '@shared/auth/rest/auth.rest';
import { AuthService } from '@shared/auth/services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  constructor(private authService: AuthService, private authRest: AuthRest, private mainRest: MainRest, private router: Router) {}

  token: string | null = this.authService.getAccessToken();
  email: string | null = this.authService.getUser();
  isTwoFa: boolean = true;
  isCreateBoard: boolean = false;
  step: number = 0;
  secret: string = '';
  otpauthUrl: string = '';
  qrCode: string = '';
  twoFactorCode: string = '';
  boardName: string = '';
  member: string = '';
  boardMembers: string[] = [];
  boards: { name: string; id: number; shared: boolean }[] = [];

  ngOnInit() {
    if (!this.token || !this.email) this.router.navigate(['/auth/login']);

    this.authRest.getUserDetails(this.email as string).subscribe((data) => {
      if (data) {
        console.log(data);
        const { email, lastLoggedAt, is2fa } = data;
        if (!lastLoggedAt && !is2fa) this.isTwoFa = false;
      }
    });

    this.mainRest.getBoards().subscribe((data) => {
      if (data) {
        console.log(data);
        this.boards = data;
      }
    });
  }

  cancelModal() {
    this.isTwoFa = true;
  }

  submitToken() {
    this.step = 2;
  }

  submitTwoFactor() {
    this.isTwoFa = true;
    this.step = 1;

    this.authRest.getTwoFaCode().subscribe((data) => {
      if (data) {
        const { otpauth_url, qr_code, secret } = data;
        this.secret = secret;
        this.otpauthUrl = otpauth_url;
        this.qrCode = `data:image/png;base64,${qr_code}`;
        // if (!lastLoggedAt && !is2fa) this.isTwoFa = false;
        console.log(data);
      }
    });
  }

  submitCode() {
    this.authRest.setTwoFactorAuth(this.email as string, this.twoFactorCode).subscribe((data) => {
      if (data) {
        this.step = 0;
        // if (!lastLoggedAt && !is2fa) this.isTwoFa = false;
        console.log(data);
      }
    });
  }

  addBoardHandle() {
    this.isCreateBoard = true;
  }

  submitBoard() {
    this.mainRest.createBoard(this.boardName, this.boardMembers).subscribe((data) => {
      if (data) {
        this.isCreateBoard = false;
        // if (!lastLoggedAt && !is2fa) this.isTwoFa = false;
        console.log(data);
      }
    });
  }

  addMember() {
    console.log(this.member);
    this.boardMembers = [...this.boardMembers, this.member];
    this.member = '';
    // this.mainRest.createBoard(this.boardName, this.boardMembers).subscribe((data) => {
    //   if (data) {
    //     this.isCreateBoard = false;
    //     // if (!lastLoggedAt && !is2fa) this.isTwoFa = false;
    //     console.log(data);
    //   }
    // });
  }
  goToBoard(boardId: number, shared: boolean) {
    console.log(shared);
    if (shared) this.router.navigate(['/board/share', boardId]);
    else this.router.navigate(['/board', boardId]);
    // this.mainRest.createBoard(this.boardName, this.boardMembers).subscribe((data) => {
    //   if (data) {
    //     this.isCreateBoard = false;
    //     // if (!lastLoggedAt && !is2fa) this.isTwoFa = false;
    //     console.log(data);
    //   }
    // });
  }
}
