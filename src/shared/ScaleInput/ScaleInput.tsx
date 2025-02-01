import styles from "./ScaleInput.module.scss"
interface ScaleInputTypes {
    defaultValue: number,
    handler: (e:  React.ChangeEvent<HTMLInputElement>)=> void,
    placeholder: string
}
const ScaleInput = ({defaultValue, handler, placeholder}: ScaleInputTypes) => {
    return ( <input 
        className={styles.input}
        onChange={e=>handler(e)}
        defaultValue={defaultValue}
        placeholder={placeholder}
    />

     );
}
 
export default ScaleInput;