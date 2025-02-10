const Message = ({variant, children}) => {
    const getVariantClass = () =>{
        switch(variant){
            case "success":
                return "bg-green-200 text-green-800"
            case "error":
                return "bg-blue-200 text-blue-800"
            default:
                return "bg-red-200 text-red-800"
        }
    }
  return <div className={`p-4 rounded ${getVariantClass()}`}>{children}</div>;
}

export default Message