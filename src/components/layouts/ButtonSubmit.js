function ButtonSubmit({ submitting, handleEvent, value, className = "", style = {}, icon }) {
    return (
        <button className={`btn lh-1 ${className}`} type="button" style={{ ...style }} disabled={submitting} onClick={!submitting ? handleEvent : null}>
            {submitting ? (
                <>
                    <span className="spinner-border spinner-border-sm" role="status"></span> Submitting...
                </>
            ) : (
                <span className="d-flex align-items-center justify-content-center">
                    {icon && <i className={icon}></i>}
                    {value}
                </span>
            )}
        </button>
    );
}

export default ButtonSubmit;
