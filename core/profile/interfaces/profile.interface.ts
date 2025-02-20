export interface ProfileResponse {
  profile: Profile;
}

export interface Profile {
  avatar?: string;
  createdAt: string;
  email: string;
  fullName: string;
  id: string;
  type: string;
  updatedAt: string;
}
