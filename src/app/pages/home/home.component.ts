import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  data:Promise<any> | undefined;
  supply = '';
  soldedP = '';
  traded = '';

  mostLikedPoxels = [
    {name: "Poxel #221", tokenID: "80739684086283914899540330473723147570013666022775308459003514442667220008961", imgSrc: "https://lh3.googleusercontent.com/emIpgzQLl4ZedwTYHwbnJEqba4K1LHTKuGU1xXktvZ65vIr5aCw7L5Mn14O9qfpozIvi-UoBfj7mk_pT_Ppmxc68aqcPyXnCMiLclw=w600"},
    {name: "Poxel #169", tokenID: "80739684086283914899540330473723147570013666022775308459003514385492615364609", imgSrc: "https://lh3.googleusercontent.com/SI7KU5Ceff0euvC0kTvvbXQsg9AW7ui-G-yshf2LUGc8Gnqa60FO_bJMCCAkduH7G9pJQgluEZsXXgiaLiElooRk7sgyxaQ3lhwE0rg=w600"},
    {name: "Poxel #178", tokenID: "80739684086283914899540330473723147570013666022775308459003514395388220014593", imgSrc: "https://lh3.googleusercontent.com/IKNo1eUHtjccqyDtf8U2ATsTgK2I1X-MfrCYTWpoU87YQVRIeXHdEOJ9sXUwBPTbEwRuDkfJ_3RLKb9xxOgXV8rhJCOxY-Kif0Xf-A=w600"},
    {name: "Poxel #191", tokenID: "80739684086283914899540330473723147570013666022775308459003514409681871175681", imgSrc: "https://lh3.googleusercontent.com/TKv_PAS6PnvxhFatNnMuOebIKESCTbDRt5nZF63gAUZeKpvYbzWk09I1hlJ98hX9TUoWfa3vqYuGKrIUdteC__jX8ZRLPr4_812QIw=w600"},
    {name: "Poxel #72" , tokenID: "80739684086283914899540330473723147570013666022775308459003514277740475842561", imgSrc: "https://lh3.googleusercontent.com/0XhAHgFQQQ632MTZuaS7aVPBFXKVQIgOaP3IqbFPV_paUI8CQwWZbtE6tkVcks56waoO-2QS_K4YJkri0l33cwRiJnnE5WvrFMe7Dw=w600"},
    {name: "Poxel #166", tokenID: "80739684086283914899540330473723147570013666022775308459003514382194080481281", imgSrc: "https://lh3.googleusercontent.com/48rmmPgiffixswGBWjOmSThnrXmXdV8IRyQFaNp1Pz8Iit7_z5fBvwU7EFcmGaS8HcYOD0NcJOd-0D3qmmb8WbyWvPwp-J8MSOmgtDk=w600"},
    {name: "Poxel #6"  , tokenID: "80739684086283914899540330473723147570013666022775308459003514204073196781569", imgSrc: "https://lh3.googleusercontent.com/5ZzB3DbXeunv07OvO-xyoR1iGAxiANzr1mGsYsy-svXB_-cFQD-fvhgFAH6LjXmyU7FRzDJknN9XDizcaRIpvwZqHh-rsUI1WRdZtzc=w600"},
    {name: "Poxel #2"  , tokenID: "80739684086283914899540330473723147570013666022775308459003514198575638642689", imgSrc: "https://lh3.googleusercontent.com/eowdTKyCx6MFu_Pzw8hDSb37QRZG0brbWFfV5WhE01HwVwCZC8DOg8NQj_pnK3fwMHeC-Wb-Wyu3zG3g-8jfFL5SWNfstCf5rUSg7Q=w600"},
    {name: "Poxel #50" , tokenID: "80739684086283914899540330473723147570013666022775308459003514253551220031489", imgSrc: "https://lh3.googleusercontent.com/pR4aM7r2v6zpUxgijvKSpsyY8YrhccCc5R0JrA8wBcpMtP9k2tWaJeaysEv6lIN6633OKsFcaFLxWboZxV-4GqOyGpycU4GNt3YygJw=w600"},
    {name: "Poxel #232", tokenID: "80739684086283914899540330473723147570013666022775308459003514454761847914497", imgSrc: "https://lh3.googleusercontent.com/sgDhG5CKMeaZjcUh6eHr-u-8EUiHEl_6q1ZXHjsdeJXKyuZ2GxyiogXHsqfHCoOv58xSqQuKh4F3dERUzJMg2hbrogKZW9NVVAle3u4=w600"},
  ]

  ngOnInit(): void {
    async function getColStatsJson(res:any) {
      return (await res).json();
    }

    const getSupply = (col:any) =>{
      if(col.stats.total_supply > 999){
        this.supply = (col.stats.total_supply / 1000).toFixed(0) + "K"
      }
      else{
        this.supply = col.stats.total_supply;
      }
      return col.stats.total_supply;
    }

    const getSoldedPercent = (col:any) =>{
      this.soldedP = ((col.stats.total_sales/col.stats.total_supply)*100).toFixed(1);
      return ((col.stats.total_sales/col.stats.total_supply)*100);
    }
    
    const getTradedValue = (col:any) =>{
      if(col.stats.total_volume >= 10){
        this.traded = (col.stats.total_volume).toFixed(0);
      }
      else { this.traded = (col.stats.total_volume).toFixed(1); }
      return col.stats.total_volume;
    }

    const options = {method: 'GET', headers: {Accept: 'application/json'}};

    fetch('https://api.opensea.io/api/v1/collection/poxels-nft/stats', options)
      .then(response => getColStatsJson(response))
      .then(response => {
        getSupply(response);
        getSoldedPercent(response);
        getTradedValue(response);
      })

    this.data?.then(response => () => {this.supply = response.stats.total_supply});
    this.data?.then(response => () => {this.soldedP = response.total_sales});
    this.data?.then(response => () => {this.traded = response.total_volume});

    const faders = document.querySelectorAll('.fade-in');
    const sliders = document.querySelectorAll('.slide-in');
    const appearOptions = {
      threshold: 0,
      rootMargin: "0px 0px -100px 0px"
    }

    const poxelsContainer = document.querySelectorAll('.poxel-container');
    const poxelsCards = document.querySelectorAll('.poxel-card');
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
      let containerD = container.getBoundingClientRect();
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
