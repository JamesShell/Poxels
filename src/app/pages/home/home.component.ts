import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const faders = document.querySelectorAll('.fade-in');
    const sliders = document.querySelectorAll('.slide-in');
    const appearOptions = {
      threshold: 0,
      rootMargin: "0px 0px -100px 0px"
    }

    const poxelsContainer = document.querySelectorAll('.poxel-container');
    const poxelsCards = document.querySelectorAll('.poxel-img');
    const nxtbtn = document.querySelectorAll('.next-btn');
    const prebtn = document.querySelectorAll('.pre-btn');

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
      entries.forEach(entry => {
        if(!entry.isIntersecting){
          entry.target.classList.remove('appear');
          return;
        } else {
          entry.target.classList.add('appear');
          appearOnScroll.unobserve(entry.target);
        }
      })
    }, appearOptions);

    faders.forEach(fader => {
      appearOnScroll.observe(fader);
    })
    sliders.forEach(slider => {
      appearOnScroll.observe(slider);
    })


    poxelsContainer.forEach((container, i) => {
      let containerD = poxelsCards[i].getBoundingClientRect();
      let containerWidth = containerD.width;

      nxtbtn[i].addEventListener('click', () => {
        container.scrollLeft += containerWidth;
      })

      prebtn[i].addEventListener('click', () => {
        container.scrollLeft -= containerWidth;
      })
    })
  }



}
