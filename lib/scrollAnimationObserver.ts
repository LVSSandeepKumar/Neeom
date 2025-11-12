// utils/scrollAnimationObserver.ts

export function observeScrollAnimations(
  selectors: string | string[] = '.anim-fade-in, .anim-slide-up, .anim-slide-down, .anim-slide-left, .anim-slide-right, .anim-zoom-in, .anim-zoom-out, .anim-rotate-in, .anim-bounce-in',
  options: IntersectionObserverInit = { threshold: 0.2 },
  animationClass = 'in-view'
): { observer: IntersectionObserver; disconnect: () => void } {
  const selectorList = typeof selectors === 'string' ? [selectors] : selectors;
  const observedElements = new Set<Element>();
  let frameId: number | null = null;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add(animationClass);
        // Add console log for debugging
        console.log(`Element ${entry.target.className} is now in view.`);
      } else {
        entry.target.classList.remove(animationClass);
        // Add console log for debugging
        console.log(`Element ${entry.target.className} is now out of view.`);
      }
    });
  }, options);

  const observeAllElements = () => {
    console.log('Running observeAllElements...');
    selectorList.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        if (!observedElements.has(el)) {
          observer.observe(el);
          observedElements.add(el);
          console.log('Observing element:', el);
        }
      });
    });
  };

  const mutationObserver = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (!(node instanceof Element)) return;
        selectorList.forEach(sel => {
          if (node.matches(sel) && !observedElements.has(node)) {
            observer.observe(node);
            observedElements.add(node);
          }
          node.querySelectorAll(sel).forEach(descendant => {
            if (!observedElements.has(descendant)) {
              observer.observe(descendant);
              observedElements.add(descendant);
            }
          });
        });
      });
    });
  });

  // Wait for the next animation frame to query the DOM
  frameId = window.requestAnimationFrame(() => {
    observeAllElements();
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    // Fallback: Check for elements already in view on page load
    // The entries provided by the observer for the initial run are
    // not guaranteed to be consistent across browsers.
    // Manually run a check after setting up the observer.
    window.requestAnimationFrame(() => {
        observer.takeRecords().forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add(animationClass);
            }
        });
    });
  });
  
  return {
    observer,
    disconnect: () => {
      observer.disconnect();
      mutationObserver.disconnect();
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    },
  };
}
