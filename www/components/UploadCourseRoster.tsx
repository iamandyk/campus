import { useCallback } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useDropzone } from "react-dropzone";

const UPLOAD_COURSE_ROSTER = gql`
  mutation UploadCourseRoster($file: Upload!) {
    uploadCourseRoster(file: $file)
  }
`;

export default () => {
  const [
    uploadCourseRoster,
    { data, loading: mutationLoading, error: mutationError }
  ] = useMutation(UPLOAD_COURSE_ROSTER);
  const onDrop = useCallback(([file]) => {
    uploadCourseRoster({ variables: { file } });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  if (mutationLoading) return <div>Uploading...</div>;

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
};
