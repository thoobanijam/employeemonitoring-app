export interface Employee {
  id: string;
  name: string;
  organization: string;
  department: string;
  team: string;
  phone: string;
  userid: string;
  password: string;
  gender: "male" | "female";

  
  age?: number;           
  DOJ?: string;           
  place?: string;
  nationality?: string;
  qualification?: string;
  salary?: number;         
}
