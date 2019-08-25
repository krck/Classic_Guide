// Linking Step-Types to the corresponding Icons
const imageDictionary = {
	0: '<img src="images/icons/action_levelup.png" />',
	1: '<img src="images/icons/quest_new.png" />',
	2: '<img src="images/icons/quest_finished.png" />',
	3: '<img src="images/icons/action_kill.png" />',
	4: '<img src="images/icons/action_gather.png" />',
	5: '<img src="images/icons/action_skills.png" />',
	6: '<img src="images/icons/action_hearthstone.png" />',
	7: '<img src="images/icons/action_grind.png" />',
	8: '<img src="images/icons/action_buy.png" />',
	9: '<img src="images/icons/action_fly.png" />',
	10: '<img src="images/icons/action_travel.png" />',
	11: '<img src="images/icons/action_dungeon.png" />'
}
  
// HTML Document "main"
$(document).ready(function () {
	// Menu-Toggle Click: Show or hide the Sidebar
	$('#menu-toggle').click(function (e) {
		e.preventDefault()
		$('#wrapper').toggleClass('toggled')
	})

	// On Dialog Button click: Add the Title and Map-Image
	$('#mapModal').on('show.bs.modal', function (event) {
		// Get the Table-Cell Button and extract parameters from data-* attributes
		const button = $(event.relatedTarget)
		const mapName = button.data('mapname')

		// Set the Dialog title based on map and coords
		$('#mapModalTitle').text(mapName.replace('_', ' '))
		// Reset the current Dialog content and add the new map image
		$('#mapModalBody').empty()
		$('#mapModalBody').append('<img id="mapImage" src="images/maps/' + mapName + '.jpg" class="fit-image"></img>')
	})

	// On Dialog Visible: Get the Quest Information and add Coord-Dots to the map based on current Client width/height
	$('#mapModal').on('shown.bs.modal', function (event) {
		// Get the Table-Cell Button and extract parameters from data-* attributes
		const map = $('#mapImage')[0]
		const button = $(event.relatedTarget)
		const questId = button.data('questid')
		const zoneId = button.data('zoneid')
		const stepType = button.data('steptype')
		const mapName = button.data('mapname')

		// Query the specific Quest data from the API
		$.getJSON(('http://localhost:3000/questTarget/' + questId + '?stepType=' + stepType + '&zoneId=' + zoneId), function (result) {
			// Update the Dialog title based on map and quest data
			$('#mapModalTitle').text(mapName.replace('_', ' ') + ' [Quest: ' + result.quest + ']')

			// Check each Quest Target (NPC, OBJECT) in the list if it has coords in the curren Zone and add them
			result.targets.forEach(function (target) {
				if (target !== null) {
					// Create a new dot for each item in the coords array
					target.locations.forEach(function (coords, index, array) {
						// Set the "dot" image and image-tooltip
						const imgTitle = ' title="' + target.name + '"'
						const imgSource = (stepType === 1 || stepType === 2)
							? ' src="images/icons/dot_green.png"'
							: ' src="images/icons/dot_red.png"'

						// Calculate the "dot" image position based on current Map-Image size and coords
						const posLeft = Number(map.clientWidth / 100.0) * parseFloat(coords.x) - 10.0
						const posTop = Number(map.clientHeight / 100.0) * parseFloat(coords.y) - 10.0
						const imgStyle = 'style="top: ' + posTop + 'px; left: ' + posLeft + 'px;"'

						// Add a "dot" image to the Map on the top-most Layer of the page
						$('#mapModalBody').append('<img class="dot" ' + imgTitle + imgStyle + imgSource + '" ></div>')
					})
				}
			})
		})
	})

	// GET all zones from the API and create the HTML elements
	$.getJSON('http://localhost:3000/zone', function (json) {
		json.forEach(function (zone) {
			const buttonIcon = '<i class="fas fa-crosshairs"></i>'
			const buttonAttribs = 'type="button" class="btn btn-secondary btn-xs" data-toggle="modal" data-target="#mapModal"'

			// Add Zone steps Table
			let table = $('<table></table>').addClass('tbstyle')
			const stepCount = zone.steps.length
			for (i = 0; i < stepCount; i++) {
				// For each step: Add a new row with all the columns
				const step = zone.steps[i]
				let row = $('<tr></tr>')
				row.append('<td class="centerCell">' + (i + 1) + '</td>')
				row.append('<td class="checkBoxCell"><input type="checkbox" name="vehicle1" /></td>')
				row.append('<td class="centerCell">' + imageDictionary[step.stepType] + '</td>')
				row.append('<td>' + step.stepText + '</td>')

				// Button Column with Dialog-Button (passing all Dialog Parameters as data-attributes)
				let buttonCell = $('<td class="buttonCell"></td>')
				if (step.questId !== null) {
					buttonCell.append('<button ' + buttonAttribs +
						' data-mapName="' + zone.zoneName + '"' +
						' data-questid="' + step.questId + '"' +
						' data-zoneid="' + zone.zoneID + '"' +
						' data-steptype="' + step.stepType + '">' +
						buttonIcon + '</button>')
				}
				row.append(buttonCell)

				// Add the row to the table
				table.append(row)
			}

			// Create the Zone Header with name and add all content to the main container
			const maindDiv = $('<div></div>')
			maindDiv.append('<h2 class="jumptarget" id="' + zone.segmentID + '">' + zone.segmentTitle + '</h2>')
			maindDiv.append(table)
			$('#mainContent').append(maindDiv)

			// Add link to the Sidebar
			$('#sidebarMenu').append('<li><a href="#' + zone.segmentID + '" class="text-white">' + zone.segmentTitle + '</a></li>')
		})
	})

})
