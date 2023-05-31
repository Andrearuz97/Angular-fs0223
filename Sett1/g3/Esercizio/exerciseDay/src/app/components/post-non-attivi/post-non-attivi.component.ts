import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.interface';
import { PostsService } from 'src/app/service/posts.service';

@Component({
  selector: 'app-post-non-attivi',
  templateUrl: './post-non-attivi.component.html',
  styleUrls: ['./post-non-attivi.component.scss']
})
export class PostNonAttiviComponent implements OnInit {

  posts!: Post[];
  constructor(private postsSrv: PostsService) {
    this.postsSrv.getPosts().then((data) => {
      this.posts = data;
      console.log(this.posts);
    });
  }

  ngOnInit(): void {}

}
