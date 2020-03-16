export default class Appear {

  constructor($options = {}) {
    // settings

    let defaults = {
      startEvent: 'DOMContentLoaded',
      easing: 'ease-in-out',
      duration: 500,
      delay: 0
    };
		this.options = Object.assign({}, defaults, $options);
		
    // body tag attributes can override the above
    
    this.options.easing = $('body').data('appear-easing') || this.options.easing;
    this.options.duration = $('body').data('appear-duration') || this.options.duration;
    this.options.delay = $('body').data('appear-delay') || this.options.delay;
    
    $('body')
      .attr('data-appear-easing', this.options.easing)
      .attr('data-appear-duration', this.options.duration)
      .attr('data-appear-delay', this.options.delay);
    
    //<div 
    //	data-appear="fade-in"                             // transition
    // 	data-appear-easing="ease-in-out"                  // easing
    //  data-appear-duration="500"                        // duration in ms
    //  data-appear-delay="0"                             // delay in ms
    //>

    if ( 
      this.options.startEvent == 'DOMContentLoaded' && 
      ( 
        document.readyState === 'complete' ||
        ( document.readyState !== 'loading' && !document.documentElement.doScroll ) 
      ) 
    )
    {
      this.initAnimations();
    }
    else
    {
      document.addEventListener(this.options.startEvent, e => {
        this.initAnimations();
      });      
    }

  }

  initAnimations() {
    $('[data-appear]:not(.appear-animate)')
      .addClass('appear-animate');
  }

}