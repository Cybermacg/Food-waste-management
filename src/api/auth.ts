import { service } from "../utils/service"

interface accountLoginRequest {
  username: string,
  password: String,

}
interface accountLoginResponse {
  token: string
  user_id: number
  username: string
  email: string
  profile: {
    id: string
    user: number
    username: string
    email: string
    first_name: string
    last_name: string
    full_name: string
    branch: string
    branch_name: string
    chain_name: string
    role: string
    role_display: string
    phone_number: string
    created_at: string
    updated_at: string
  }
}

interface accountRegisterRequest {
  chain: string
  name: string
  city: string
  state: string
  address: string
  is_pilot_intervention: boolean
  has_standby_generator: boolean
  is_active: boolean
}

export interface NewBranchAccountRegisterResponse {
  id: string
  chain: string
  name: string
  city: string
  city_display: string
  state: string
  state_display: string
  address: string
  is_pilot_intervention: boolean
  has_standby_generator: boolean
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface OrgRegRequest {
  name: string
  headquarters_city: string
}
export interface OrgRegResponse {
  chain: string
  name: string
  city: string
  state: string
  address: string
  is_pilot_intervention: boolean
  has_standby_generator: boolean
  is_active: boolean
}


export class authServices {
  constructor() { }

  static postLoginAccount = async (payload: accountLoginRequest) => {
    const response = await service.post<accountLoginResponse>('/api/v1/auth/login/', payload)
    return response?.data;
  }

  static postRegisterAccount = async (payload: accountRegisterRequest) => {
    const response = await service.post<NewBranchAccountRegisterResponse>('/api/v1/organization/branches/', payload)
    return response?.data;
  }

  static postRegisterOrganization = async (payload: OrgRegRequest) => {
    const response = await service.post<OrgRegResponse>('/api/v1/organization/chains/', payload)
    return response?.data;
  }
}