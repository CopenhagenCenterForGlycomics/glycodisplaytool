<template>
  <div>
  <x-heatmap src="human.svg"></x-heatmap>
  </div>
</template>

<script>

const PATTERNS = {
	'B4GALT6' : '*(u?-?)Gal(u?-?)Glc',
	'COSMC' : 'Gal(b1-3)GalNAc',
	'MGAT1' : 'GlcNAc(b1-?)Man(a1-?)Man(b1-4)GlcNAc(b1-4)GlcNAc'
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
			heatmap.overlayPattern('rgba(255,0,0,0.25)',PATTERNS[gene]);
		}
  	}
  }
}
</script>