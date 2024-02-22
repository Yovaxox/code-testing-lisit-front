'use client'
import Swal from 'sweetalert2'

export const OperationAlert = async (
  isSuccess: boolean,
  message: string = ''
) => {
  try {
    const customMessage =
      message !== '' ? message : 'The operation was not successful'
    const result = await Swal.fire({
      title: isSuccess ? 'Successful Operation' : 'Something went wrong',
      text: isSuccess ? 'The operation was successful' : customMessage,
      icon: isSuccess ? 'success' : 'error',
      confirmButtonColor: '#3085d6',
      allowOutsideClick: false,
    })
    return result.isConfirmed
  } catch (error) {
    throw error
  }
}

export const DeleteConfirm = (mensaje: string) => {
  return new Promise((resolve, reject) => {
      Swal.fire({
          title: 'Are you sure you want to delete this record?',
          text: mensaje,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, confirm',
          cancelButtonText: 'Cancel'
      }).then((result: any) => {
          resolve(result.isConfirmed);
      })
  });
}
