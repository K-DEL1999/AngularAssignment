export class Employee {
  [key:string]:string | number;
  id!:number;
  firstName!:string;
  lastName!:string;
  age!:number;
  gender!:string;
}

export class EmployeeList {
  List!:Employee[];

  constructor(list:Employee[]){
    this.List = list;
  }

  public findOne(Id:number):Employee | null{
    for(let employee of this.List){
        if (employee.id === Id){
            return employee;
        }
    }
    return null;
  }

  public delete(Id:number) :Employee | null{
    for(let employee in this.List){
        if (this.List[employee].id == Id){
            var deleted_data = this.List[employee];
            this.List.splice(Number(employee),1);
            return deleted_data;
        }
    }
    return null;
  }

  public insert(item:Employee) :Employee | null{
    if (this.findOne(item.id) == null){
        let employee:Employee = item;
        this.List.push(employee);
        return employee;
    }
    return null;
  }
  public update(item:Employee) :Employee | null{
    //or make a deep copy --> let employee = {...item};
    let employee = this.findOne(item.id);
    if (employee != null){
        this.delete(employee.id);
        this.insert(item);
        return item;
    }
    return null;
  }

  public generateId(){
    let maxId = 0;

    for (let employee of this.List){
      if (maxId < employee.id){
        maxId = employee.id;
      }
    }

    return maxId+1;
  }
}
