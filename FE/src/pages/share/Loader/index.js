import { ClipLoader } from "react-spinners";
export default function Loader(props) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
        background: "white",
        opacity: 0.2,
        zIndex: 999999999,
      }}
    >
      <ClipLoader color="#36D7B7" loading={true} size={150} />
    </div>
  );
}
