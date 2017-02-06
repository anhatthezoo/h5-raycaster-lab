/**
 * Created by ralphy on 23/01/17.
 * @const MANSION
 * @property MANSION.NOTES.goules
 * effect : HORROR
 * "Le culte des goules" by "Comte d'Erlette"
 * will trigger an "horror effect" : HORROR
 */
O2.createObject('MANSION.NOTES.goules', [
    {
        type: 'title',
        content: 'Le Culte des Goules'
    },
    {
        type: 'text',
        content: 'A forbidden book written by french author Comte d\'Erlette. ' +
        'This tome depicts gruesome customs of an ancien and secret society ' +
        'whose members name themselves "les goules".'
    },
    {
        type: 'photo',
        src: 'resources/ui/documents/note_culte_goules.jpg',
    },
    {
        type: 'text',
        content: 'The book is very rare and is rumored to drive readers insane.'
    },
    {
        type: 'button',
        action: 'Horror',
        caption: 'Read a passage',
        legend: 'Books don\'t drive people insane, do they ?'
    }
]);
