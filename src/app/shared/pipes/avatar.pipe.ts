import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'avatar'
})
export class AvatarPipe implements PipeTransform {

  transform(imgUrl: string | undefined): string {
    
    if (imgUrl){
      return imgUrl
    }else{
      return 'assets/images/default_avatar.png';
    }
  }
}
