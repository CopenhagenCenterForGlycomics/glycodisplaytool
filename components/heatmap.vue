<template>
  <div>
  <x-heatmap src="human.svg"></x-heatmap>
  </div>
</template>

<script>

const PATTERNS = {
	'B4GALT6' : '*(u?-?)*(u?-?)Gal(u?-?)Glc(u?-?)Cer',
	'COSMC' : 'Gal(b1-3)GalNAc(a1-O)Ser;*(u?-?)Gal(b1-3)GalNAc(a1-O)Ser;Gal(b1-3)[*(u?-?)GlcNAc(b1-?)]GalNAc(a1-O)Ser',
	'MGAT1' : '*(u?-?)*(u?-?)GlcNAc(b1-?)Man(a1-?)Man(b1-4)GlcNAc(b1-4)GlcNAc(b1-N)Asn'
}

export default {
  props: {
    genes: {
      type: Array,
      default: []
    }
  },
  mounted () {
  },
  watch: {
  	genes: function() {
		const heatmap = this.$el.querySelector('x-heatmap');
		heatmap.clearHeatmap();
		for (let gene of this.genes) {
			if ( ! PATTERNS[gene]) {
				continue;
			}
			heatmap.overlayPatterns('rgba(255,0,0,0.25)',PATTERNS[gene].split(';'));
		}
  	}
  }
}
</script>