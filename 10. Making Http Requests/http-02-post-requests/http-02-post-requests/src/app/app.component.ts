import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from './post.model';
import { PostsService } from './posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching: boolean = false;
  getPostsSubs: Subscription;
  errorSubs: Subscription;
  error = null;

  constructor(private postsService: PostsService) { }

  ngOnInit() {
    this.errorSubs = this.postsService.error.subscribe(errorMsg => {
      this.error = errorMsg
    })
    this.fetchingPosts();
  }

  ngOnDestroy(){
    this.getPostsSubs.unsubscribe();
    this.errorSubs.unsubscribe();
  }

  onCreatePost(postData: Post) {
    this.postsService.craeteAndStorePost(postData.title, postData.content)
  }

  onFetchPosts() {
    this.fetchingPosts();
  }

  onClearPosts() {
    this.postsService.deleteAllPost().subscribe(() => {
      this.loadedPosts = []
    })
  }

  fetchingPosts() {
    this.isFetching = true;
    this.getPostsSubs = this.postsService.fetchPosts().subscribe(post => {
      this.isFetching = false;
      this.loadedPosts = post;
    },
     error => {
      this.isFetching = false;
      this.error = error.error.error;    
    });
  }

  onHandleError(){
    this.error = null;
  }
}
