Template.animeCardProxy.coverImageUrlProxy = function() {
	var anime = Template.instance().data;

	if (anime.revisionId) {
		if (anime.coverImage) {
			return "http://cdn.phanime.com/images/anime/cover/" + anime._id  + "/" + anime.coverImage;
		} else {
			return "http://cdn.phanime.com/images/site/na.gif";
		}
	} else {
		if (anime.coverImage) {
			return "http://cdn.phanime.com/images/anime/cover/" + anime.coverImage;
		} else {
			return "http://cdn.phanime.com/images/site/na.gif";
		}
	}

};


Template.animeCardProxy.titleProxy = function() {
	// For the time being we just choose
	// the standard title
	return anime.canonicalTitle;
}