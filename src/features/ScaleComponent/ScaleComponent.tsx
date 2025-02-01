import ScaleButton from "@/shared/ScaleButton/ScaleButton";
import ScaleInput from "@/shared/ScaleInput/ScaleInput";
import styles from "./ScaleComponent.module.scss"
import { useDispatch, useSelector } from "react-redux";
import { ScaleSelector } from "@/pages/store/Selectors/SizeReducer";
import { setScale } from "@/pages/store/Reducers/SizeReducer";
const ScaleComponent = () => {
    const dispatch = useDispatch()
    const scale = useSelector(ScaleSelector)
    const handleIncrement = () => {
        dispatch(setScale(scale + 10))
    }
    const handleDecrement = () => {
        dispatch(setScale(scale - 10))
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
dispatch(setScale(Number(e.target.value)))
    }
    return (
        <div className={styles.scale}>
            <ScaleInput
                defaultValue={1}
                handler={handleChange}
                placeholder="1"
            />
            <ScaleButton
                handler={handleDecrement}
                text="-"
            />
            <ScaleButton
                handler={handleIncrement}
                text="+"
            />
        </div>);
}

export default ScaleComponent;