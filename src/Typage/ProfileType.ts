export interface Profile {
  id: 0
  firstName: string
  lastName: string
  description: string
  email: string
  phone: string
  location: string
  picture: string
  studies: [ {
    name: string
    logo: string
    city: string
    duration: string
    description: string
    position: string
  }
  ]
  skills: [
    {
      name: string
      logo: string
    }
  ]
  jobs: [
    {
      name: string
      logo: string
      city: string
      duration: string
      description: string
      position: string
    }
  ]
  website: string
}

export interface ProfileCompany {
  id: number
  name: string
  description: string
  email: string
  phone: string
  address: string
  size: number
  location: string
  activity: string
  speciality: string
  website: string
  picture: string
}
