/**
 * Created by ralphy on 18/02/17.
 */
/**
 * Created by ralphy on 24/01/17.
 * this spell will lower the ambiant lighting
 * duration : 30 seconds
 *
 * @class MANSION.SPELLS.Darkness
 */

O2.createClass('MANSION.SPELLS.Darkness', {
    run: function(g) {
        var eDark = new Effect.Bonus('sight');
        var p = g.oLogic.getPlayerSoul();
        eDark.setSource(p);
        eDark.setTarget(p);
        eDark.setLevel(-25);
        eDark.setDuration(MANSION.CONST.SPELL_DURATION_MEDIUM);
        var ep = g.oLogic.getEffectProcessor();
        ep.applyEffect(eDark);
    }
});