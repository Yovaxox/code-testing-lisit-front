import { GetCountries, GetRegions, GetDistricts, CreateUser, SignInUser } from "@/application/interactors/Home";

export const GetCountriesLogic = (GetCountriesCallBack: any) => {
    return GetCountries(GetCountriesCallBack);
}

export const GetRegionsLogic = (GetRegionsCallBack: any) => {
    return GetRegions(GetRegionsCallBack);
}

export const GetDistrictsLogic = (GetDistrictsCallBack: any) => {
    return GetDistricts(GetDistrictsCallBack);
}

export const CreateUserLogic = (CreateUserCallBack: any, data: any) => {
    return CreateUser(CreateUserCallBack, data);
}

export const SignInUserLogic = (SignInCallBack: any, data: any) => {
    return SignInUser(SignInCallBack, data);
}