//////////////////////////////////
/////////// Get ALL //////////////
//////////////////////////////////

// maps to: /api/v1/resource

RESTstop.add('libraryEntries', { require_login: true, method: 'GET' }, function() {

	// Grab all of user's library entries

	return {libraryEntries: LibraryEntries.find({ userId: this.user._id }).fetch()};

});

//////////////////////////////////////////////
////////////// GET specific by ID ////////////
//////////////////////////////////////////////

// maps to: /api/v1/resource/:id

RESTstop.add('libraryEntries/:_id', { require_login: true, method: 'GET' }, function() {

	// Grab a specific entry from user's library

	return {libraryEntry: LibraryEntries.findOne({_id: this.params._id, userId: this.user._id })};

});


//////////////////////////////////////////////
////////////// PUT specific by ID ////////////
//////////////////////////////////////////////

// maps to: /api/v1/resource/:id

RESTstop.add('libraryEntries/:_id', { require_login: true, method: 'PUT' }, function() {

	// Update a specific library entry for user

	var updatedLibraryEntry = this.request.body;

	// Ensure data coming in is valid
	if (updatedLibraryEntry.status) {
	
		// if we don't pass we should return
		if (!restAPIHelpers.allowedValues.checkStatus(updatedLibraryEntry.status)) {
			return restAPIHelpers.returns.invalidInput();
		}

	}

	if (updatedLibraryEntry.episodesSeen) {
	
		// We aren't doing an exhaustive check like figuring out if the episodesSeen lies 
		// in between the total episodes or not.
		// we really should be doing that though.
		if (!restAPIHelpers.allowedValues.checkEpisodesSeen(updatedLibraryEntry.episodesSeen)) {
			return restAPIHelpers.returns.invalidInput();
		}

	}

	if (updatedLibraryEntry.comments) {
	
		// if we don't pass we should return
		if (!restAPIHelpers.allowedValues.checkComments(updatedLibraryEntry.comments)) {
			return restAPIHelpers.returns.invalidInput();
		}

	}

	if (updatedLibraryEntry.rating) {
	
		// if we don't pass we should return
		if (!restAPIHelpers.allowedValues.checkRating(updatedLibraryEntry.rating)) {
			return restAPIHelpers.returns.invalidInput();
		}

	}

	if (updatedLibraryEntry.privacy) {
	
		// if we don't pass we should return
		if (!restAPIHelpers.allowedValues.checkPrivacy(updatedLibraryEntry.privacy)) {
			return restAPIHelpers.returns.invalidInput();
		}

	}

	if (updatedLibraryEntry.highPriority) {
	
		// if we don't pass we should return
		if (!restAPIHelpers.allowedValues.checkHighPriority(updatedLibraryEntry.highPriority)) {
			return restAPIHelpers.returns.invalidInput();
		}

	}

	if (updatedLibraryEntry.rewatching) {
	
		// if we don't pass we should return
		if (!restAPIHelpers.allowedValues.checkRewatching(updatedLibraryEntry.Rewatching)) {
			return restAPIHelpers.returns.invalidInput();
		}

	}

	// Ensure object keys are part of the schema and aren't random
	if (restAPIHelpers.schemaCheck.libraryEntries(updatedLibraryEntry)) {

		// We don't want to save the animeId, it can't be changed
		if (updatedLibraryEntry.animeId) {
			delete updatedLibraryEntry.animeId;
		}

		// We don't want to update the userId either, since it can't be changed
		if (updatedLibraryEntry.userId) {
			delete updatedLibraryEntry.userId
		}

		// Update the date for when the library entry was updated
		updatedLibraryEntry.updatedAt = new Date();

		LibraryEntries.update({_id: this.params._id, userId: this.user._id}, {$set: updatedLibraryEntry});
		return {libraryEntry: LibraryEntries.findOne({_id: this.params._id, userId: this.user._id })};

	} else {
		return restAPIHelpers.returns.invalidInput();
	}

});