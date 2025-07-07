# File: ia_service/utils/logger.py

# ia_service/utils/logger.py

import logging, sys

def get_logger(name: str) -> logging.Logger:
    """
    Configure un logger standard :
    - sortie sur stdout
    - format [timestamp] [LEVEL] [logger_name] message
    """
    logger = logging.getLogger(name)
    if not logger.handlers:
        handler = logging.StreamHandler(sys.stdout)
        handler.setFormatter(logging.Formatter(
            "%(asctime)s %(levelname)s [%(name)s] %(message)s"
        ))
        logger.addHandler(handler)
        logger.setLevel(logging.INFO)
    return logger
