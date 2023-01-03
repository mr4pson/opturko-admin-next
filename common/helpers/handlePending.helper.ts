const handlePending = (state: { loading: boolean }) => {
  state.loading = true;
  console.log('pending')
}

const handleChangePending = (state: { saveLoading: boolean }) => {
  state.saveLoading = true;
  console.log('pending')
}

export { handleChangePending, handlePending }