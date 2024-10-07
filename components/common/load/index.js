import Load from "./Load";
import LoadLogo from "./LoadLogo";
import LoadPay from "./LoadPay";

var load = {
  LoadBase: (progress) => {
    return <Load progress={progress} />;
  },
  LoadLogo: <LoadLogo />,
  LoadPay: <LoadPay />,
};
export default load;
