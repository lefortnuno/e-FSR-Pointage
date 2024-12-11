import Template from "../../components/template/template";
import DaysOFF from "./joursFeries/joursFerie";
import Homie from "./homies/homie"

export default function Home() {
  return (
    <Template>
        <div className="row mt-0">
            <Homie/>
            <DaysOFF/> 
        </div>
    </Template>
  );
}
