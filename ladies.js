/**
 *		Ladies.js - v1.0.0
 *
 *		(⌐■_■)
 *
 *		@dailydaigle - 2014
 *
 *		Does what you think it does... ladies.
 */

(function( window, document ) {

	/*********************************************************
	 *	Alright, in all seriousness, we are going to try to
	 *  add "ladies" to the end of every qualified string.
	 *********************************************************/	 

	var 


	// These elements make the most sense to modify. Everything else
	// is probably a media element or a structural element.
	nodes = [ 'ARTICLE', 'SECTION', 'B', 'I', 'STRONG', 'P', 'SPAN', 
			  'DIV', 'A', 'BODY', 'BUTTON', 'TD', 'TH', 'DD', 'DT', 
			  'EM', 'FORM', 'LABEL', 'HTML', 'HEADER', 'FOOTER',
			  'LI', 'NAV', 'H1', 'H2' ,'H3', 'H4', 'H5', 'H6' ],


	// we should be weary of these
	warningNodes = [ 'SCRIPT', 'STYLE', 'CANVAS', 'VIDEO' ],


	// So we can respect punctuation in sentences
	punctuationChars = ['.', '!', '?', ' ', "\n", "\r"],



	/* Ignition function to add some ladies up in here */
	removeSausageFest = function( elements ) {
		analyzeNodes( elements, null );
	},



	/* Returns the number of children nodes that have valid tag names */
	countValidChildren = function( elements ) {
		var childCount = 0,
			realChildCount = 0,
			warningCount = 0;
		for ( var i = 0; i < elements.length; i++ ) {
			realChildCount++;
			if ( nodes.indexOf( elements[ i ].nodeName ) !== -1 ) {
				childCount++;
			}
			if ( warningNodes.indexOf( elements[ i ].nodeName ) !== -1 ) {
				warningCount++;
			}
		}
		if ( warningCount === realChildCount ) {
			return false;
		} else {
			return childCount;
		}
	},


	/* Recursively applies ladies */
	analyzeNodes = function( elements, lastTextContent ) {
		for ( var i = 0; i < elements.length; i++ ) {

			/**
			 *  RULES:
			 *
			 *  1. If element tag name is not of interest, skip.
			 *  2. If element is hidden, skip.
			 *	3. If the text content is the same as parent and this has no 
			 *     valid children, apply ladies.
			 */

			// Ignore nodes outside of our list (Rule #1)
			if ( nodes.indexOf( elements[ i ].nodeName ) === -1 ) {
				continue;
			}

			// Ignored hidden elements (Rule #2)
			if ( elements[ i ].style.display === 'none' 
					|| elements[ i ].style.visibility === 'hidden' ) {
				continue;
			}


			var thisTextContent = elements[ i ].textContent;

			// Because node.textContent travels to all children, we know
			// early whether or not we should continue down this branch.
			if ( thisTextContent === '' ) {
				continue;
			}

			var
				isValid = true,
				childCount = countValidChildren( elements[ i ].children );

			// This means all children are inline functional code like CSS 
			// or JavaScript... we should skip this or things might break.
			if ( childCount === false && elements[ i ].innerText === '' ) {
				continue;
			}

			var hasChildren = ( childCount > 0 );

			//  Rule #3
			if ( ! hasChildren ) {
				applyLadies( elements[ i ] );
				continue;
			}

			if ( hasChildren ) {
				analyzeNodes( elements[ i ].children, thisTextContent );
			} 
		}
	},


	/* Sometimes sentences end with more punctuation than usual. */
	getPunctuationLimit = function( sentence, textLength )  {
		var index = textLength;
		if ( punctuationChars.indexOf( sentence.charAt(index) ) !== -1 ) {
			return getPunctuationLimit( sentence, ( index - 1 ) );
		} else {
			return index + 1;
		}
	},


	/* Updates an element in the DOM, but with more ladies */
	applyLadies = function( node ) {
		var currentText = node.textContent,
			textLength = currentText.length;

		// One-word strings don't make much sense in ladies context
		if ( currentText.indexOf(' ') < 0 ) {
			return false;
		} 

		// Respect the punctuation.
		if ( punctuationChars.indexOf( currentText.charAt( textLength - 1 ) ) !== -1 ) {
			var sliceIndex = getPunctuationLimit( currentText, ( textLength - 1 ) );
			node.textContent = currentText.slice( 0, sliceIndex ) + '...ladies' 
				+ currentText.slice( sliceIndex );
		} else {
			node.textContent += '...ladies';
		}

	};



	/* Give it to me baby. uh-huh. uh-huh. */
	window.Ladies = function( selector ) {

		// This is a gag script, so let's not make it too 
		// backwards-compatable.
		if ( ! document.querySelectorAll ) {
			console.error( 'Hey ladies, I\'m too cool for this browser (⌐■_■)\n'+
				' (Seriously though, ladies.js needs document.querySelectorAll '+
					'to work properly.)' );
			return false;
		}

		// If the selector isnt a string, the developer is clearly an idiot.
		if (  typeof selector !== 'string' ) {
			console.error( '(⌐■_■) Bro, that selector wasn\'t a string. STEP UP YOUR GAME, YO. (ladies.js)' );
			return false;
		}
		
		// Okay, we're done being jerks. Let's get to work.
		var selected = document.querySelectorAll( selector );		

		// Get some ladies up in here
		removeSausageFest( selected );
	};

})( window, document );