import Feedback from './../models/feedback';

export const list = (req, res) => {
    Feedback.find((error, feedback) => {
        if(error) {
            return res.status(400).json({
                error: "Không tìm thất danh sách fb"
            })
        }
        res.json(feedback);
    })
}

export const add = (req, res) => {
    const feedback = new Feedback(req.body);
    feedback.save((err, fb) => {
        if(err) {
            return res.status(400).json({
                error: "Phản hồi thất bại"
            })
        }
        res.json(fb);
    })
}