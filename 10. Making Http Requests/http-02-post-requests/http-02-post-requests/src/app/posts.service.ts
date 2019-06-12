import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import { Post } from './post.model';
import { map, catchError, tap } from 'rxjs/operators';
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
      postData,
      {
        observe: 'response'
      }
    ).subscribe(responseData => {
      console.log(responseData)
    },
      error => {
        this.error.next(error.error.error)
      });
  }

  fetchPosts() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('print2', 'pretty2');

    return this.http.get<{ [key: string]: Post }>('https://ng-course-fba83.firebaseio.com/posts.json', {
      headers: new  HttpHeaders({ "Custom-Header": "Hello" }),
      params: new HttpParams().set('print', 'pretty')
    })
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
    return this.http.delete('https://ng-course-fba83.firebaseio.com/posts.json', 
    {
      observe: 'events',
      responseType: 'text'
    })
      .pipe(tap(event => {
      console.log(event);
      if(event.type === HttpEventType.Response){
        console.log(event.body)
      }
    }))
  }
}
