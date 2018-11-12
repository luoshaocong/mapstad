import React, { Component } from 'react';


class Table extends Component{
  render() {
    return (
      <div className="container">
      <table className="table ">
      <thead className="thead">
      <tr>
      <th>Test Case Description</th>
      <th>Data</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td>Total purchase costs for Samsung manufacture devices</td>
      <td> {this.calculateSamsungDevicesCost()}</td>
      </tr>
      <tr>
      <td>Total number of times item (item_id = 47) was purchased</td>
      <td>{this.numberOfTimesItemPurchased()}</td>
      </tr>
      <tr>
      <td>Total purchase costs for item’s in the category (item_category_id = 7)</td>
      <td>{this.totalPurchaseCostItemCategory()}</td>
      </tr>
      <tr>
      <td>Total purchase costs in Ontario</td>
      <td>{this.purchaseCostInOntario()}</td>
      </tr>
      <tr>
      <td>Total purchase costs in the United States</td>
      <td>{this.purchaseCostInUS()}</td>
      </tr>
      <tr>
      <td>Which building (name or id) has the most total purchase costs?</td>
      <td>{this.buildingPurchaseCost()}</td>
      </tr>
      </tbody>
      </table>
      </div>
    );
  }

  calculateSamsungDevicesCost(){
    var total=0;
    for(var i=0;i<this.props.data1.length;i++){
      if(this.props.data1[i].manufacturer=="Samsung") {
        for (var j = 0; j < this.props.data1[i].usage_statistics.session_infos.length; j++) {
          for (var k = 0; k < this.props.data1[i].usage_statistics.session_infos[j].purchases.length; k++) {
            total = total + this.props.data1[i].usage_statistics.session_infos[j].purchases[k].cost;
          }
        }
      }
    }

    return total;

  }

  numberOfTimesItemPurchased(){
    var total=0;
      for(var i=0;i<this.props.data1.length;i++){
        for (var j = 0; j < this.props.data1[i].usage_statistics.session_infos.length; j++) {
          for (var k = 0; k < this.props.data1[i].usage_statistics.session_infos[j].purchases.length; k++) {
            if(this.props.data1[i].usage_statistics.session_infos[j].purchases[k].item_id==47){
              total=total+1;
            }
          }
        }
      }
    return total;
  }


  totalPurchaseCostItemCategory(){
    var total=0;
      for(var i=0;i<this.props.data1.length;i++){
        for (var j = 0; j < this.props.data1[i].usage_statistics.session_infos.length; j++) {
          for (var k = 0; k < this.props.data1[i].usage_statistics.session_infos[j].purchases.length; k++) {
            if(this.props.data1[i].usage_statistics.session_infos[j].purchases[k].item_category_id ==7){
              total=total+this.props.data1[i].usage_statistics.session_infos[j].purchases[k].cost;
            }
          }
        }
      }
    return total;
  }

  purchaseCostInOntario(){
    var total=0;
    var building=0;
      for(var m=0;m<this.props.data2.length;m++) {
        if (this.props.data2[m].state === "Ontario") {
          building = this.props.data2[m].building_id;
            for (var i = 0; i < this.props.data1.length; i++) {
              for (var j = 0; j < this.props.data1[i].usage_statistics.session_infos.length; j++) {
                for (var k = 0; k < this.props.data1[i].usage_statistics.session_infos[j].purchases.length; k++) {
                  if (this.props.data1[i].usage_statistics.session_infos[j].building_id == building) {
                    total = total + this.props.data1[i].usage_statistics.session_infos[j].purchases[k].cost;
                  }
                }
              }
            }
        }
      }
      return total;
  }

  purchaseCostInUS(){
    var total=0;
    var building=0;
    for(var m=0;m<this.props.data2.length;m++){
      if(this.props.data2[m].country==="United States"){
            building=this.props.data2[m].building_id;
                for(var i=0;i<this.props.data1.length;i++){
                    for (var j = 0; j < this.props.data1[i].usage_statistics.session_infos.length; j++) {
                        for (var k = 0; k < this.props.data1[i].usage_statistics.session_infos[j].purchases.length; k++) {
                          if(this.props.data1[i].usage_statistics.session_infos[j].building_id==building){
                            total=total+this.props.data1[i].usage_statistics.session_infos[j].purchases[k].cost;
                          }
                        }
                    }
                }
            }
      }
    return total;
  }

  buildingPurchaseCost(){
    var total=0;
    var building=0;
    let buildingnum;
    buildingnum=new Array(51+1).join('0').split('').map(parseFloat);
      for(var i=0;i<this.props.data1.length;i++){
        for (var j = 0; j < this.props.data1[i].usage_statistics.session_infos.length; j++) {
          for (var k = 0; k < this.props.data1[i].usage_statistics.session_infos[j].purchases.length; k++) {
            total=total+this.props.data1[i].usage_statistics.session_infos[j].purchases[k].cost;
          }
          buildingnum[this.props.data1[i].usage_statistics.session_infos[j].building_id]+=total;
          total=0;
        }
      }
      let maxnum=0;
      let index=0;
      for(var i=1;i<buildingnum.length;i++){
        if(buildingnum[i]>maxnum){
          maxnum=buildingnum[i];
          index=i;
        }
      }
      return index;
    }

  }

export default Table
