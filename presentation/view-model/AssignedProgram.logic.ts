import { CreateAssignedProgram, DeleteAssignedProgram, GetAssignedPrograms, GetMyAssignedPrograms, GetUsers, UpdateAssignedProgram } from "@/application/interactors/AssignedProgram"

export const GetAssignedProgramsLogic = (GetAssignedProgramsCallBack: any) => {
  return GetAssignedPrograms(GetAssignedProgramsCallBack)
}

export const GetUsersLogic = (GetUsersCallBack: any) => {
  return GetUsers(GetUsersCallBack)
}

export const CreateAssignedProgramLogic = (CreateAssignedProgramCallBack: any, data: any) => {
  return CreateAssignedProgram(CreateAssignedProgramCallBack, data)
}

export const UpdateAssignedProgramLogic = (UpdateAssignedProgramCallBack: any, data: any) => {
  return UpdateAssignedProgram(UpdateAssignedProgramCallBack, data)
}

export const DeleteAssignedProgramLogic = (DeleteAssignedProgramCallBack: any, data: any) => {
return DeleteAssignedProgram(DeleteAssignedProgramCallBack, data)
}

export const GetMyAssignedProgramsLogic = (GetMyAssignedProgramsCallBack: any, data: number) => {
  return GetMyAssignedPrograms(GetMyAssignedProgramsCallBack, data)
}