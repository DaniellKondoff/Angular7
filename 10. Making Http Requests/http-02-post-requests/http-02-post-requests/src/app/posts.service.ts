import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { map, catchError } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  error = new Subject<string>();

  constructor(private http: HttpClient) { }

  craeteAndStorePost(title: string, content: string) {
    const postData: Post = { title, content }

    this.http.post(
      'https://ng-course-fba83.firebaseio.com/posts.json',
      postData
    ).subscribe(responseData => {
      console.log(responseData)
    },
      error => {
        this.error.next(error.error.error)
      });
  }

  fetchPosts() {
    return this.http.get<{ [key: string]: Post }>('https://ng-course-fba83.firebaseio.com/posts.json')
      .pipe(map(responseData => {
        const postArray: Post[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            postArray.push({ ...responseData[key], id: key })
          }
        }
        return postArray;
      }),
      catchError(errorRes => {
        //Sent to analytic server
       return throwError(errorRes)
      })
    );
  }

  deleteAllPost() {
    return this.http.delete('https://ng-course-fba83.firebaseio.com/posts.json')
  }
}
