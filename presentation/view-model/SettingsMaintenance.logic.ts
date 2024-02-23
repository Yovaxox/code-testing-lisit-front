import {
  CreateCountry,
  UpdateCountry,
  DeleteCountry,
  CreateRegion,
  UpdateRegion,
  DeleteRegion,
  CreateDistrict,
  UpdateDistrict,
  DeleteDistrict,
  CreateProgram,
  DeleteProgram,
  GetPrograms,
  UpdateProgram,
} from '@/application/interactors/SettingsMaintenance'

/* Countries */

export const CreateCountryLogic = (CreateCountryCallBack: any, data: any) => {
  return CreateCountry(CreateCountryCallBack, data)
}

export const UpdateCountryLogic = (UpdateCountryCallBack: any, data: any) => {
  return UpdateCountry(UpdateCountryCallBack, data)
}

export const DeleteCountryLogic = (DeleteCountryCallBack: any, data: any) => {
  return DeleteCountry(DeleteCountryCallBack, data)
}

/* Regions */

export const CreateRegionLogic = (CreateRegionCallBack: any, data: any) => {
  return CreateRegion(CreateRegionCallBack, data)
}

export const UpdateRegionLogic = (UpdateRegionCallBack: any, data: any) => {
  return UpdateRegion(UpdateRegionCallBack, data)
}

export const DeleteRegionLogic = (DeleteRegionCallBack: any, data: any) => {
  return DeleteRegion(DeleteRegionCallBack, data)
}

/* Districts */

export const CreateDistrictLogic = (CreateDistrictCallBack: any, data: any) => {
  return CreateDistrict(CreateDistrictCallBack, data)
}

export const UpdateDistrictLogic = (UpdateDistrictCallBack: any, data: any) => {
  return UpdateDistrict(UpdateDistrictCallBack, data)
}

export const DeleteDistrictLogic = (DeleteDistrictCallBack: any, data: any) => {
  return DeleteDistrict(DeleteDistrictCallBack, data)
}

/* Programs */

export const GetProgramsLogic = (GetProgramsCallBack: any) => {
  return GetPrograms(GetProgramsCallBack)
}

export const CreateProgramLogic = (CreateProgramCallBack: any, data: any) => {
  return CreateProgram(CreateProgramCallBack, data)
}

export const UpdateProgramLogic = (UpdateProgramCallBack: any, data: any) => {
  return UpdateProgram(UpdateProgramCallBack, data)
}

export const DeleteProgramLogic = (DeleteProgramCallBack: any, data: any) => {
  return DeleteProgram(DeleteProgramCallBack, data)
}
