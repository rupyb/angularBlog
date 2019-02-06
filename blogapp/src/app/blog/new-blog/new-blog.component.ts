import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BlogserviceService } from 'src/app/service/blogservice.service';
import { ServerService } from 'src/app/service/server.service';

@Component({
  selector: 'app-new-blog',
  templateUrl: './new-blog.component.html',
  styleUrls: ['./new-blog.component.css']
})
export class NewBlogComponent implements OnInit {
  user;
  profileForm = this.fb.group({
    title: ['', Validators.required],
    content: ['']
  });
  constructor(private fb: FormBuilder, private blogService: BlogserviceService,
    private serverService: ServerService) { 
      this.serverService.currentUser.subscribe(res => this.user = res);
    }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.profileForm.value);
    console.log('this.user', this.user);
    const newPost = {...this.profileForm.value, author: this.user[0].firstName};
    console.log('newPost', newPost);

    this.blogService.post(newPost).subscribe();
}
}
