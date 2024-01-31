import { Component, Input } from '@angular/core';
import { Message } from '@modules/board/models/message.model';
import { AuthService } from '@shared/auth/services/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent {
  @Input() socket: any;
  @Input() email: string = '';
  @Input() token: string = '';
  message: string = '';
  chatMessages: Message[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.socket.on('error', () => {
      this.authService.logout();
    });

    this.socket.on('connect', () => {
      this.socket.emit('chat:join:room', this.token);
    });

    this.socket.on('chat:load:messages', (messages: Message[]) => {
      this.chatMessages = messages;
    });

    this.socket.on('chat:new:message', (message: Message) => {
      this.chatMessages = [...this.chatMessages, message];
    });
  }

  sendMessage() {
    const data: {
      email: string;
      token: string;
      content: string;
    } = { email: this.email, token: this.token, content: this.message };
    this.socket.emit('chat:send:message', data);
  }
}
