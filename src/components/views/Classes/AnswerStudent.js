import { format } from "date-fns";

function AnswerStudent({ answer }) {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return format(date, "MMM dd, yyyy 'at' hh:mm a");
    };

    return (
        <div className="bg-gray-100 card-body mb-3 rounded">
            <div className="row">
                <div className="col-sm-auto mb-3 mb-sm-0">
                    <div className="d-sm-inline-block d-flex align-items-center">
                        <img className="wid-60 img-radius mb-2" src="../assets/images/user/user-placeholder.png" alt={answer.createdBy} />
                        <div className="ms-3 ms-sm-0 text-sm-center">
                            <p>
                                <i className="fas fa-star text-warning"></i> {answer.star}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="row">
                        <div className="col">
                            <div className="">
                                <h4 className="d-inline-block">{answer.createdBy}</h4>
                                <p className="text-muted">{formatDate(answer.time)}</p>
                            </div>
                        </div>
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: answer.content }} />
                </div>
            </div>
        </div>
    );
}

export default AnswerStudent;
