import { toast } from "react-toastify";

export const copyText = (text) => {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.select();
    textarea.style.display = "none";
    document.body.appendChild(textarea);

    toast.success(`Copied: ${text}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });

    textarea.remove();
};
