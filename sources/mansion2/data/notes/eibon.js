/**
 * Created by ralphy on 24/01/17?
 * @const MANSION
 * @property MANSION.NOTES.eibon
 * A test document : the voynich manuscript
 */
O2.createObject('MANSION.NOTES.eibon', [
    {
        type: 'title',
        content: 'Liber Ivonis'
    },
    {
        type: 'text',
        content: '"The Book of Eibon" (Liber Ivonis in latin) is rumored to have been written by an hyperborean warlock several thousands years ago. ' +
            'The present tome is a latin translation of the original volume. ' +
            'Eibon was a famous wizard who accomplished exploits on remote and strange land and planets.'
    },
    {
        type: 'photo',
        src: 'resources/ui/documents/note_eibon.jpg',
    },
    {
        type: 'text',
        content: 'During his journeys, Eibon had to fight strange creatures, and slayed many otherworldly horrors with powerful spells. ' +
            'Such spells are written in this book.'
    },
    {
        type: 'button',
        action: 'Heal',
        caption: 'Read formula',
        legend: 'It may help you defend yourself against hostile and vengeful spirits.'
    }
]);