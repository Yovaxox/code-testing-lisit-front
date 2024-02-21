import Swal from 'sweetalert2'

export const OperationAlert = (isSuccess: boolean) => {
  Swal.fire({
    title: isSuccess ? 'Successful Operation' : 'Something went wrong',
    text: isSuccess ? 'The operation was successful' : 'The operation was not successful',
    icon: isSuccess ? 'success' : 'error',
    confirmButtonColor: '#3085d6',
  })
}
