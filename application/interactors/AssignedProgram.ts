import { IServiceResult } from '@/infrastructure/interfaces/IServiceResult'
import { SVCAssignedProgram } from '@/infrastructure/services/SVCAssignedProgram'

export const GetAssignedPrograms = (GetAssignedProgramsCallBack: any) => {
  SVCAssignedProgram.GetAssignedPrograms().then((res: IServiceResult<any>) => {
    if (res.result !== undefined) {
      let data: any = res.result
      GetAssignedProgramsCallBack(false, '', data)
    } else {
      GetAssignedProgramsCallBack(true, 'error', [])
    }
  })
}

export const GetUsers = (GetUsersCallBack: any) => {
  SVCAssignedProgram.GetUsers().then((res: IServiceResult<any>) => {
    if (res.result !== undefined) {
      let data: any = res.result
      GetUsersCallBack(false, '', data)
    } else {
      GetUsersCallBack(true, 'error', [])
    }
  })
}

export const CreateAssignedProgram = (
  CreateAssignedProgramCallBack: any,
  data: any
) => {
  SVCAssignedProgram.CreateAssignedProgram(data).then(
    (res: IServiceResult<any>) => {
      if (res.result !== undefined) {
        let data: any = res
        CreateAssignedProgramCallBack(false, '', data)
      } else {
        let data: any = res.errorDetails
        CreateAssignedProgramCallBack(true, 'error', data)
      }
    }
  )
}

export const UpdateAssignedProgram = (
  UpdateAssignedProgramCallBack: any,
  data: any
) => {
  SVCAssignedProgram.UpdateAssignedProgram(data).then(
    (res: IServiceResult<any>) => {
      if (res.result !== undefined) {
        let data: any = res
        UpdateAssignedProgramCallBack(false, '', data)
      } else {
        let data: any = res.errorDetails
        UpdateAssignedProgramCallBack(true, 'error', data)
      }
    }
  )
}

export const DeleteAssignedProgram = (
  DeleteAssignedProgramCallBack: any,
  data: any
) => {
  SVCAssignedProgram.DeleteAssignedProgram(data).then(
    (res: IServiceResult<any>) => {
      if (res.result !== undefined) {
        let data: any = res
        DeleteAssignedProgramCallBack(false, '', data)
      } else {
        let data: any = res.errorDetails
        DeleteAssignedProgramCallBack(true, 'error', data)
      }
    }
  )
}

export const GetMyAssignedPrograms = (
  GetMyAssignedProgramsCallBack: any,
  data: number
) => {
  SVCAssignedProgram.GetMyAssignedPrograms(data).then(
    (res: IServiceResult<any>) => {
      if (res.result !== undefined) {
        let data: any = res
        GetMyAssignedProgramsCallBack(false, '', data)
      } else {
        let data: any = res.errorDetails
        GetMyAssignedProgramsCallBack(true, 'error', data)
      }
    }
  )
}
