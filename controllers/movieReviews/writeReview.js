const { review } = require('../../models');

module.exports = {
  post: async (req, res) => {
    const { title, text, userId, reviewId, movieId, movieName } = req.body;
    console.log(req.body);
    try {
      if (reviewId) {
        //리뷰 수정
        const editedRes = await review.update(
          { title, text },
          { where: { id: reviewId } }
        );
        console.log(editedRes);
        if (editedRes[0] === 1) {
          res.status(200).send('리뷰 수정 성공');
        } else {
          res.status(404).send('수정된 리뷰가 없습니다.');
        }
      } else {
        //처음 작성
        const result = await review.create({
          title,
          text,
          userId,
          movieId,
          movieName,
          views: 0,
        });
        console.log(result);
        if (result) {
          res.status(200).json({ reviewId: result.id });
        } else {
          res.status(404).send('작성된 리뷰가 없습니다.');
        }
      }
    } catch (err) {
      res.status(500).send(err);
    }
  },
};
