import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  doughnutChartLabels: string[] = ['Pending', 'Active', 'Completed'];
  doughnutChartData:number[] = [null,null,null]; 
  chartOptions = {
    responsive: true
  };

  constructor(private service: UserService) {
  }

  ngOnInit() {
    this.service.getChartValue().subscribe(
      res => {
        const array1 = res.data;
        this.doughnutChartData = Object.values(array1)
      },
      err => console.log(err),
    )
  }



}
