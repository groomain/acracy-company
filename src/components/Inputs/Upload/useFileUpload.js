import { useCallback, useEffect, useReducer } from 'react';

// Constants
const LOADED = 'LOADED'
const INIT = 'INIT'
const PENDING = 'PENDING'
const FILES_UPLOADED = 'FILES_UPLOADED'
const UPLOAD_ERROR = 'UPLOAD_ERROR'
const initialState = {
  files: [],
  pending: [],
  next: null,
  uploading: false,
  uploaded: {},
  status: 'idle',
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'load':
      return { ...state, files: action.files, status: LOADED }
    case 'submit':
      return { ...state, uploading: true, pending: state.files, status: INIT }
    case 'next':
      return {
        ...state,
        next: action.next,
        status: PENDING,
      }
    case 'file-uploaded':
      return {
        ...state,
        next: null,
        pending: action.pending,
        uploaded: {
          ...state.uploaded,
          [action.prev.id]: action.prev.file,
        },
      }
    case 'files-uploaded':
      return { ...state, uploading: false, status: FILES_UPLOADED }
    case 'set-upload-error':
      return { ...state, uploadError: action.error, files: action.files, status: UPLOAD_ERROR }
    default:
      return state
  }
}

const useFileUpload = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault()
      if (state.files.length) {
        dispatch({ type: 'submit' })
      } else {
        window.alert("You don't have any files loaded.")
      }
    },
    [state.files.length],
  )

  const onChange = (e) => {
    const fileList = e.target.files;
    const arrFiles = Array.from(fileList)

    if (fileList.length && fileList[0].size < 5e+6) {
      const files = arrFiles.map((file, index) => {
        const src = window.URL.createObjectURL(file)
        return { file, id: index, src }
      })
      dispatch({ type: 'load', files })
    }
    else {
      const files = arrFiles.map((file, index) => {
        const src = window.URL.createObjectURL(file)
        return { file, id: index, src }
      })
      dispatch({ type: 'set-upload-error', files })
    }
  }

  // Ends the upload process
  useEffect(() => {
    if (!state.pending.length && state.uploading) {
      dispatch({ type: 'files-uploaded' })
    }
  }, [state.pending.length, state.uploading]);

  return {
    ...state,
    onSubmit,
    onChange,
  }
}

export default useFileUpload;