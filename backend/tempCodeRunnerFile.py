@app.route('/predict', methods=["GET", "POST"])
# def predict():

#     if request.method == "GET":
#         return jsonify({"message": "Broke bitch"})
#     data = request.get_json()
#     url = data["url"]

#     if (is_top_domain(url)):
#         return jsonify({
#             "class": "benign",
#             "score": 1.0
#         })
    
#     features = extract_features(url)

#     prediction = model.predict_proba([features])[0]
#     pred_idx = prediction.argmax()
#     predicted_class = classes[pred_idx]
#     score = prediction[pred_idx]

#     return jsonify({
#         "class": predicted_class,
#         "score": float(score)
#         # "all_scores": {cls: float(prob) for cls, prob in zip(classes, prediction)}
#     })