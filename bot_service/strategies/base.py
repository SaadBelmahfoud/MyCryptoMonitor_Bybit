# bot_service/strategies/base.py

class Strategy:
    """
    Interface des stratégies avec gestion de risque
    """
    def __init__(self, max_position=0.1):
        self.max_position = max_position  # % du portefeuille par position
        self.active_position = False

    def generate_signal(self, indicator, current_price):
        raise NotImplementedError

    def update_position(self, has_position):
        self.active_position = has_position