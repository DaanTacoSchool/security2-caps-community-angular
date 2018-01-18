
export class User {

  constructor(
    public id: number,
    public guid: string,
    public fullName: string,
    public vendorId: string,
    public email: string,
    public phoneNumber: string,
    public password: string,
    public roleIds: number[]
  ) { }

}

