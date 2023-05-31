import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.interface';
import { PostsService } from 'src/app/service/posts.service';
@Component({
  selector: 'app-post-attivi',
  templateUrl: './post-attivi.component.html',
  styleUrls: ['./post-attivi.component.scss']
})
export class PostAttiviComponent implements OnInit {
  posts!: Post[];
  constructor(private postsSrv: PostsService) {
    this.postsSrv.getPosts().then((data) => {
      this.posts = data;
      console.log(this.posts);
    });
  }

  ngOnInit(): void {
  }

}
