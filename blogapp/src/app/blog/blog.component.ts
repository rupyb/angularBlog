import { Component, OnInit } from '@angular/core';
import { BlogserviceService } from '../service/blogservice.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  blogs = [];
  numComments = 0;
  showTheComments = false;

  constructor(private blogService: BlogserviceService) {
    this.blogService.get().subscribe(data => {
      this.blogs = data;
      console.log(data );
      this.blogs = this.blogs.map( blog => {
        blog.hideme = true;
        return blog;
      });
      console.log(this.blogs );
    });
  }

  ngOnInit() {

  }

  showComments() {
    this.showTheComments = !this.showTheComments;
  }
}
